contract('FundingHub', function (accounts) {
    // it.only('should create a project', function (done) {
    it('should refund a project', function () {
        var fh = FundingHub.deployed();
        var p;

        fh.createProject("TestName", "TestDesc", accounts[0], 100, 5, {from:accounts[0]}).then(function(instance){
            var eProjectCreated = fh.ProjectCreated();
            var projectAddr = eProjectCreated.options.address;
            p = Project.at(projectAddr);
            console.log(p.address);

            p.refund(50, {from:accounts[0]}).then(function(instance){
                console.log(instance);
            }).catch(function(error){
                console.log(error);
            });

        });

    });
});