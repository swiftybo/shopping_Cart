describe("user is unable to add items to cart when product becomes out of stock or is already out of stock", () => {
  beforeEach(
    "beforeEach hook to navigate to homepage at start of each test case",
    () => {
      cy.visit("http://localhost:5173/");
    },
  );

  // This test case works however, it can be improved by:
  // 1. relies on 'stock_count' id not changing; POM would address this.
  // 2. second get query gets generic "button" element which would break if more buttons are introduced. Better to identify with id / class.
  // it("should be able to add to cart if in stock", () => {
  //   cy.get("[id='stock_count']")
  //     .each(function (el, index) {
  //       const currentStock = el.text().split(" ")[0];
  //       if (currentStock > 1) {
  //         cy.wrap(currentStock).as("stockNum");
  //         cy.wrap(index).as("productIndex");
  //         return false;
  //       }
  //     })
  //     .then(function () {
  //       cy.get("button").eq(this.productIndex).click();
  //       cy.get("[id='stock_count']")
  //         .eq(this.productIndex)
  //         .then(function (el) {
  //           const newStock = el.text().split(" ")[0];
  //           cy.wrap(+newStock).should("equal", this.stockNum - 1);
  //         });
  //     });
  // });

  // This test case is better:
  // 1. button is found within the fetched productIcon element, making it more reliable than the above solution.
  // 2. The final assertion uses regex assertion making use of cypress' retryability.
  it("should be able to add to cart if in stock", () => {
    // loops through each productIcon and gets first product that has more than 1 in stock
    cy.get(".productIcon")
      .each(function (el, index) {
        const stockNum = el.find("[id='stock_count']").text().split(" ")[0];
        if (stockNum > 1) {
          cy.wrap(stockNum).as("stockNum");
          cy.wrap(index).as("productIndex");
          return false;
        }
      })
      .then(function () {
        // clicks the "add to cart" button in productIcon
        cy.get(".productIcon")
          .eq(this.productIndex)
          .find(".productIcon_btn")
          .click();

        // checks if stock count has decreased by 1
        cy.get(".productIcon")
          .eq(this.productIndex)
          .find("[id='stock_count']")

          // this should is much better as it utilizes cypress' retryability and is more readable
          .should("contain", this.stockNum - 1);

        // using 'then()' breaks the loop and no longer uses cypress' benefits. cy.wrap() doesn't work as it usually would here
        // because a STATIC variable is wrapped, it will never change so cypress' retryability is useless. For this to work better,
        // I should wrap the element itself from then(). This is the "SOURCE".
        // .then((element) => {
        //   const newStock = element.text().split(" ")[0];
        //   cy.wrap(+newStock).should("equal", this.stockNum - 1);
        // });
      });
  });

  it("should not be able to add to cart when stock reaches 0", () => {
    // loops through each productIcon and gets first product that has only 1 in stock
    cy.get(".productIcon")
      .each(function (el, index) {
        const stockNum = el.find("[id='stock_count']").text();
        if (parseInt(stockNum) === 1) {
          cy.wrap(index).as("productIndex");
          return false;
        }
      })
      .then(function () {
        // clicks the "add to cart" button in productIcon
        cy.get(".productIcon")
          .eq(this.productIndex)
          .find(".productIcon_btn")
          .click();

        // checks if "Add to cart" button is now disabled
        cy.get(".productIcon")
          .eq(this.productIndex)
          .find(".productIcon_btn")
          .should("be.disabled");

        // checks if stock count has decreased by 1 to 0. This is signified by "Out of stock"
        cy.get(".productIcon")
          .eq(this.productIndex)
          .find("[id='stock_count']")
          .should("have.text", "Out of stock");

        // Alternative solution to getting the text from element - using cy.invoke("text")
        // cy.get(".productIcon")
        //   .eq(this.productIndex)
        //   .find("[id='stock_count']")
        //   .invoke("text")
        //   .should("equal", "Out of stock");

        // This does NOT work as text() is a jqeury method. cy.get() returns  aCypress Command Object as so
        // cy.get(".productIcon")
        //   .eq(this.productIndex)
        //   .find("[id='stock_count']")
        //   .text()
        //   .should("equal", "Out of stock");
      });
  });

  it.skip("should not be able to add to cart if product is already out of stock when customer visits page", () => {
    let itemFound = false;

    cy.get(".productIcon")
      // Filter to fetch a productIcon which is 'Out of stock'
      .each((el) => {
        if (el.find("[id='stock_count']").text() === "Out of stock") {
          itemFound = true;

          // assertion to check "Add to cart button is disabled"
          cy.wrap(el).find(".productIcon_btn").should("be.disabled");

          // assertion to check that the stock count did show as -1 and the product remains as 'Out of stock'.
          cy.wrap(el)
            .find("[id='stock_count']")
            .invoke("text")
            .should("contain", "Out of stock");
          return false;
        }
      })
      // fails the test if no 'Out of stock' item exists on the page. In later tests, this is handled by cy.contains() however in
      // this test, if no item is found, no error is thrown without this catch.
      .then(() => {
        if (!itemFound) {
          throw new Error(
            "Test failed / incomplete: No 'Out of stock' items found in the catalogue",
          );
        }
      });
  });

  // This is a shorter way of looking through the productIcons to find one which is "Out of stock". It uses the cy.parent() method to stay within the same fetched productIcon.
  it.skip("should not be able to add to cart if product is already out of stock when customer visits page", () => {
    // Filter to fetch a productIcon which is 'Out of stock'
    cy.contains(".productIcon", "Out of stock")

      // assertion to check "Add to cart button is disabled"
      .find(".productIcon_btn")
      .should("be.disabled")

      // parents() is used instead of parent() as the button is a grandchild of the productIcon and parent only goes up 1 level of the DOM tree.
      .parents(".productIcon")

      // assertion to check that the stock count did show as -1 and the product remains as 'Out of stock'.
      .find("[id='stock_count']")
      .invoke("text")
      .should("contain", "Out of stock");
  });

  // This is a shorter way of looking through the productIcons to find one which is "Out of stock". It uses Cypress aliases to stay within the same fetched productIcon.
  it("should not be able to add to cart if product is already out of stock when customer visits page", function () {
    // Filter to fetch a productIcon which is 'Out of stock' and then assigning it an alias
    cy.contains(".productIcon", "Out of stock").as("fetchedItem");

    // assertion to check "Add to cart button is disabled"
    cy.get("@fetchedItem").find(".productIcon_btn").should("be.disabled");

    // assertion to check that the stock count did show as -1 and the product remains as 'Out of stock'.
    cy.get("@fetchedItem")
      .find("[id='stock_count']")
      .invoke("text")
      .should("contain", "Out of stock");
  });
});
