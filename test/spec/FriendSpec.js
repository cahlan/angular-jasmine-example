describe("FriendController", function() { 
    
    var createController;
    var scope = {};
    var url = 'https://s3.amazonaws.com/intuiplan_company_files/production/files/public/FriendData.json';
    var $httpBackend;
    
    beforeEach(function() {
        module('AngularFriends');
    })
    
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        //fixture
        $httpBackend.when('GET', url).respond({results:[
            {
                "name": "Naishi Zhang",
                "pic_square": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/174266_842841_1023237973_q.jpg",
                "current_location": {
                    "city": "New York",
                    "state": "New York",
                    "country": "United States",
                    "zip": "",
                    "latitude": "40.7167",
                    "longitude": "-74",
                    "id": "108424279189115",
                    "name": "New York, New York"
                },
                "status": null,
                "friend_count": null
            }
        ]});
        var $controller = $injector.get('$controller');
        createController = function() {
            return $controller('FriendController', { '$scope': scope })
        }
        scope = {};
    }));
    
    describe("friend results", function() {
        
        it("should get results", function() {
            $httpBackend.expectGET(url);
            var controller = createController();
            $httpBackend.flush();
            expect(scope.friends).toBeDefined();
        });
        
        it("totalFriends should be greater than 0", function() {
            $httpBackend.expectGET(url);
            var controller = createController();
            $httpBackend.flush();
            expect(scope.totalFriends).toBeGreaterThan(0);
        });
        
        it("friend count should be an number", function() {
            $httpBackend.expectGET(url);
            var controller = createController();
            $httpBackend.flush();
            expect(typeof(scope.friends[0].friend_count)).toEqual('number');
        });
    })
});