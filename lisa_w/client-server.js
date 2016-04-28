require('express')().use(require('express')
    .static(__dirname + '/build')).listen(5000, () => console.log('up on 5000'));
