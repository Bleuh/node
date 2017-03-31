var assert = require('assert');
var request = require("request");


describe('Project NodeJS - Dates', function() {
    describe('Tests URL de base', function() {
        it("Test de connexion au serveur", function(done) {
            request.get("http://localhost:8080", function(error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });

        it("Test d'URL invalide", function(done) {
            request.get("http://localhost:8080/kjuencuedfg/", function(error, response, body) {
                assert.equal(400, response.statusCode);
                done();
            });
        });
    });

    describe('Tests format de date', function() {
        it("Test d'une date au format ISO8601", function(done) {
            request.get("http://localhost:8080/1948-12-10T11:00:00Z+1d0h0m0s", function(error, response, body) {
                assert.equal(200, response.statusCode);
                assert.equal("La date est 1948-12-11T11:00:00.000Z", body);
                done();
            });
        });

        it("Test d'une date 'compacte' au format ISO8601", function(done) {
            request.get("http://localhost:8080/2017-03-30+1d0h0m0s", function(error, response, body) {
                assert.equal(200, response.statusCode);
                assert.equal("La date est 2017-03-31T00:00:00.000Z", body);
                done();
            });
        });

        it("Test d'une date format little endian", function(done) {
            request.get("http://localhost:8080/12/04/2005+1d0h0m0s", function(error, response, body) {
                assert.equal(400, response.statusCode);
                assert.equal("invalid url", body);
                done();
            });
        });
    });

    describe('Tests ajout et retrait de temps à une date', function() {
        describe('Tests ajout temporel', function() {
            it("Ajout d'une journée", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z+1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-31T12:00:00.000Z", body);
                    done();
                });
            });

            it("Ajout d'une heure", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z+0d1h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-30T13:00:00.000Z", body);
                    done();
                });
            });

            it("Ajout d'une minutes", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z+0d0h1m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-30T12:01:00.000Z", body);
                    done();
                });
            });

            it("Ajout d'une seconde", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z+0d0h0m1s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-30T12:00:01.000Z", body);
                    done();
                });
            });
        });

        describe('Tests retrait temporel', function() {
            it("Retrait d'une journée", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z-1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-29T12:00:00.000Z", body);
                    done();
                });
            });

            it("Retrait d'une heure", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z-0d1h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-30T11:00:00.000Z", body);
                    done();
                });
            });

            it("Retrait d'une minutes", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z-0d0h1m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-30T11:59:00.000Z", body);
                    done();
                });
            });

            it("Retrait d'une seconde", function(done) {
                request.get("http://localhost:8080/2017-03-30T12:00:00Z-0d0h0m1s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-30T11:59:59.000Z", body);
                    done();
                });
            });
        });

        describe('Cas particuliers', function() {
            it("Changement de mois (avancement temporel)", function(done) {
                request.get("http://localhost:8080/2017-03-31T12:00:00Z+1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-04-01T12:00:00.000Z", body);
                    done();
                });
            });

            it("Changement de mois (retrait temporel)", function(done) {
                request.get("http://localhost:8080/2017-04-01T12:00:00Z-1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-03-31T12:00:00.000Z", body);
                    done();
                });
            });

            it("Changement d'année (avancement temporel)", function(done) {
                request.get("http://localhost:8080/2017-12-31T12:00:00Z+1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2018-01-01T12:00:00.000Z", body);
                    done();
                });
            });

            it("Changement d'année (retrait temporel)", function(done) {
                request.get("http://localhost:8080/2018-01-01T12:00:00Z-1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2017-12-31T12:00:00.000Z", body);
                    done();
                });
            });

            it("Année bissextile (retrait temporel)", function(done) {
                request.get("http://localhost:8080/2016-02-29T12:00:00Z+1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2016-03-01T12:00:00.000Z", body);
                    done();
                });
            });

            it("Année bissextile (retrait temporel)", function(done) {
                request.get("http://localhost:8080/2016-03-01T12:00:00Z-1d0h0m0s", function(error, response, body) {
                    assert.equal(200, response.statusCode);
                    assert.equal("La date est 2016-02-29T12:00:00.000Z", body);
                    done();
                });
            });
        });
    });
});