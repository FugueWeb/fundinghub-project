module.exports = function(deployer) {
  deployer.deploy(FundingHub);
  deployer.autolink();
  deployer.deploy(Project);
};

// module.exports = function (deployer) {
//     var fundingHub;
//     deployer.then(function () {
//         console.log('Deploying FundingHub...');
//         return FundingHub.new("FugueWeb FH");
//     }).then(function (result) {
//     	deployer.autolink();
//         console.log('FundingHub: ', result.address);
//         fundingHub = result;
//         console.log('Deploying Project...');
//         return result.createProject("myDefaultName", "myDefaultDesc", result.address, 400, 200);
//     }).then(function (tx) {
//         console.log('createProject tx: ', tx);
//     });
// };
