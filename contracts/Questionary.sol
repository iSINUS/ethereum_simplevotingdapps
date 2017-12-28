pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';

contract Questionary is Destructible {
	mapping (bytes32 => mapping (bytes32 => uint)) public votes;
	mapping (bytes32 => bytes32[]) public answers;
	bytes32[] public questions;

	function Questionary() {
	}

	function AddQuestion(bytes32 _question, bytes32[] _answers) onlyOwner public {
		if (answers[_question].length == 0) {
        	questions.push(_question);
      	}
		
		for (uint i = 0; i< _answers.length; i++) {
			if (votes[_question][_answers[i]] == 0) 
				answers[_question].push(_answers[i]);
				votes[_question][_answers[i]] = 1;
			}
	}

	function getQuestions() public view returns (bytes32[]) {
		return questions;
	}

	function getAnswers(bytes32 _question) public view returns (bytes32[]) {
		return answers[_question];
	}

	function vote(bytes32 _question, bytes32 _answer) public {
		votes[_question][_answer] += 1;
	}
}
