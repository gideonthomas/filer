define(["Filer", "util"], function(Filer, util) {

  describe('fs.symlink', function() {
    beforeEach(util.setup);
    afterEach(util.cleanup);

    it('should be a function', function() {
      var fs = util.fs();
      expect(fs.symlink).to.be.a('function');
    });

    it('should return an error if part of the parent destination path does not exist', function(done) {
      var fs = util.fs();

      fs.symlink('/', '/tmp/mydir', function(error) {
        expect(error).to.exist;
        expect(error.code).to.equal("ENOENT");
        done();
      });
    });

    it('should return an error if the destination path already exists', function(done) {
      var fs = util.fs();

      fs.symlink('/tmp', '/', function(error) {
        expect(error).to.exist;
        expect(error.code).to.equal("EEXIST");
        done();
      });
    });

    it('should create a symlink if source path exists', function(done) {
      var fs = util.fs();

      fs.symlink('/', '/myfile', function(error) {
        expect(error).not.to.exist;

        fs.stat('/myfile', function(error, stats) {
          expect(error).not.to.exist;
          expect(stats.type).to.equal('DIRECTORY');
          done();
        });
      });
    });
    
    it('should create a symlink if source path does not exist', function(done) {
      var fs = util.fs();

      fs.symlink('/file', '/myfile', function(error) {
        expect(error).not.to.exist;

        fs.stat('/myfile', function(error, stats) {
          console.log('Error symlink: ' + error);
          expect(error).not.to.exist;
          expect(stats.type).to.equal('DIRECTORY');
          done();
        });
      });
    });
  });

});
