import prepare from "mocha-prepare";

/* This file is just in case for test suite initialization. Test suites will not run before these resolve */

prepare(
  (done) => {
    done();
  },
  (done) => {
    done();
  }
);
