var Questionary = artifacts.require("./Questionary.sol");

contract('Questionary', function(accounts) {
  it("should not add questions and answers twice", function() {
    var meta;
    var countFirst;
    var countSecond;
    var countAnswersFirst;
    var countAnswersSecond;

    return Questionary.deployed().then(function(instance) {
      meta = instance;     
      return meta.AddQuestion("Question 1",["Answer 11", "Answer 12", "Answer 13"]);
    }).then(function() {
      return meta.getQuestions();
    }).then(function(outCount) {
      countFirst = outCount.length;
      return meta.getAnswers("Question 1")
    }).then(function(outAnswers) {
      countAnswersFirst = outAnswers.length;
      return meta.AddQuestion("Question 1",["Answer 11", "Answer 15", "Answer 15"]);
    }).then(function() {
      return meta.getQuestions();
    }).then(function(outCount) {
      countSecond = outCount.length;
      return meta.getAnswers("Question 1")
    }).then(function(outAnswers) {
      countAnswersSecond = outAnswers.length;
    }).then(function() {
        assert.equal(countFirst, countSecond, "Question was added twice");
        assert.equal(countAnswersFirst+1, countAnswersSecond, "Answers were added twice");
    });
  });

  it("should add different questions", function() {
    var meta;
    var countFirst;
    var countSecond;
    var countAnswersFirst;
    var countAnswersSecond;

    return Questionary.deployed().then(function(instance) {
      meta = instance;     
      return meta.getAnswers("Question 1")
    }).then(function(outAnswers) {
      countAnswersFirst = outAnswers.length;
      return meta.AddQuestion("Question 2",["Answer 11", "Answer 12", "Answer 13"]);
    }).then(function() {
      return meta.getQuestions();
    }).then(function(outCount) {
      countSecond = outCount.length;
      return meta.getAnswers("Question 2")
    }).then(function(outAnswers) {
      countAnswersSecond = outAnswers.length;
    }).then(function() {
        assert.equal(countSecond, 2, "Question was not added");
        assert.equal(countAnswersFirst, 4, "Answers were not added");
        assert.equal(countAnswersSecond, 3, "Answers were not added");
    });
  });

  it("should vote correctly", function() {
    var meta;
    var votes1;
    var votes2;
    var votes3;

    return Questionary.deployed().then(function(instance) {
      meta = instance;     
      return meta.vote("Question 1","Answer 12");
    }).then(function() {
      return meta.vote("Question 1","Answer 12");
    }).then(function() {
      return meta.vote("Question 2","Answer 13");
    }).then(function() {
      return meta.votes("Question 1","Answer 11");
    }).then(function(outVotes) {
      votes1 = outVotes.toNumber();
      return meta.votes("Question 1","Answer 12");
    }).then(function(outVotes) {
      votes2 = outVotes.toNumber();
      return meta.votes("Question 2","Answer 13");
    }).then(function(outVotes) {
        votes3 = outVotes.toNumber();
        assert.equal(votes1, 1, "Vote was not tracked");
        assert.equal(votes2, 3, "Vote was not tracked");
        assert.equal(votes3, 2, "Vote was not tracked");

    });
  });
});
