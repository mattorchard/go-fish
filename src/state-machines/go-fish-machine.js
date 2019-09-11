import {Machine} from "xstate";

const turnStates = {
  id: "goFishTurn",
  initial: "choose",
  context: {
    chosenRank: null,
  },
  states: {
    choose: {
      on: {CHOOSE_RANK: "announce"}
    },
    announce: {
      on: {ANNOUNCE_END: "steal"}
    },
    steal: {
      on: {
        STEAL_FAILED: "draw",
        STEAL_SUCCEED: "match"
      }
    },
    draw: {
      on: {DRAW_COMPLETE: "match"}
    },
    match: {
      on: {
        DREW_RANK: "choose",
        MATCH_COMPLETE: "end"
      }
    },
    end: {
      type: "final"
    }
  }
};

const goFishMachine = Machine({
  id: "goFish",
  initial: "playerTurn",
  states: {
    playerTurn: {
      on: {TURN_FINISHED: "opponentTurn", WIN: "won", LOST: "lost"},
      ...turnStates
    },
    opponentTurn: {
      on: {TURN_FINISHED: "playerTurn", WIN: "won", LOST: "lost"},
      ...turnStates
    },
    won: {},
    lost: {},
  }
});