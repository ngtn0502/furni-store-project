# ReactJS project: G - Interior

## Technology information (tech stacks):

    ```
    ReactJS
    React Router
    Redux - (update soon)
    Styled Component
    HTML5
    CSS3
    Auth0 - (for control login page)
    ```

## Public API that i use:

    ```

    For products: https://course-api.com/react-store-products

    For single product: https://course-api.com/react-store-single-product?id=

    ```

## Note for myself from the future:

    //////FILTER AND SORT
    In this project there are 2 variable for sorting and filtering functionality

        +all__products: the variable that does not mutable - purpose: for other variable copy it

        +filtered__products: the variable that use for render list of sorted and filtered product => it mutable in every sort but in the filter it is not the case

    Logic for filtering:

        Copy all the default product to the temp variable after every re-render => after that i will filter that temp variable => return that variable for the filtered product that display products to the UI

        Cause i copy all the default products after every re-render =>after that i do filter again => it does not run to the situation that run out of products (important part of filtering - mistake that i made now 6/2021 take much time to firuge out)

    //////When work with filter text => remember to lowerCase all

    //////CART ITEM LOGIC

    When talk about CART LOGIC:
        First step is add the amount and cart item from single products to the context API
            In the reducer of cart context => check whether the item already appear or not
                If it does not appear => create the new item
                If it appear => increase total item by amount item and also increase the total amount
        Second step is to pass the value in the context to consumer and by then display it to the UI.
