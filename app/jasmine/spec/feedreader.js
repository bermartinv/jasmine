/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Each feed in the allFeeds object and ensures it has a URL
        * defined and that the URL is not empty.                */
        it('url defined and not empty', function() {
            // loop all allFeeds url to look for an error
            for (let i = 0; i < allFeeds.length ; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
                expect(allFeeds[i].url.length).toBeGreaterThan(0)
            }
        });



        /*Each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.                              */
        it('name defined and not empty', function() {
            // loop all allFeeds url to look for an error
            for (let i = 0; i < allFeeds.length ; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            } 
        })
    });


    /* Test suite named "The menu" */
    describe("The menu", function() {

    
        /* The menu element is hidden by default.         */
        it('is hidden by default', function (){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });


         /*the menu changes visibility when the menu icon is clicked.    */
         it ('changes visibility when the menu icon is clicked', function() {
            
            // menu-icon-link disabled
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false); 
            
            // menu-icon-link without menu-hidden class
            $('.menu-icon-link').click();
             expect($('body').hasClass('menu-hidden')).not.toContain('menu-hidden');
         });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function() {
            loadFeed(0);
         });


        /* loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container               */
        it('loadFeed function is called and completes its work.', function() {
            expect($('.feed .entry').length).not.toBeLessThan(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {


        /* New feed is loaded by the loadFeed function that the content actually 
        changes.loadFeed() is asynchronous.                                 */
        it('ensures when a new feed is loaded by the loadFeed function', function() {

            let feedAfterFirstLoad;

            beforeEach(function(done) {
                loadFeed(0, function() {

                    feedAfterFirstLoad = $('.feed').html();

                    loadFeed(1, done);
                });
            });  
            
            expect($(".feed").html()).not.toBe(feedAfterFirstLoad);

        });
    });

}());
