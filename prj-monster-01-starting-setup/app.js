Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      rounds: 0,
      battleLog: [],
    };
  },

  methods: {
    attackMonster() {
      //   console.log("attacked monster.");

      if (this.monsterHealth < 1) this.gameOver("player");

      const attackValue = getRandomValue(12, 8);
      this.monsterHealth -= attackValue;

      if (this.monsterHealth < 1) this.gameOver("player");

      const actionLogEntry = {
        action: "attack",
        executioner: "player",
        damage: attackValue,
        monsterHealth: this.monsterHealth,
        playerHealth: this.playerHealth,
      };
cd
      this.battleLog.push(actionLogEntry);

      this.attackPlayer();

      this.rounds += 1;
    },

    attackPlayer() {
      //   console.log("attacked player");

      if (this.playerHealth < 1) this.gameOver("monster");

      const attackValue = getRandomValue(15, 12);

      this.playerHealth -= attackValue;

      if (this.playerHealth < 1) this.gameOver("monster");

      const actionLogEntry = {
        action: "attack",
        executioner: "monster",
        damage: attackValue,
        monsterHealth: this.monsterHealth,
        playerHealth: this.playerHealth,
      };

      this.battleLog.push(actionLogEntry);
    },

    specialAttack() {
      if (this.monsterHealth < 1) this.gameOver("player");

      const attackValue = getRandomValue(25, 20);
      this.monsterHealth -= attackValue;

      if (this.monsterHealth < 1) this.gameOver("player");

      const actionLogEntry = {
        action: "special-attack",
        executioner: "player",
        damage: attackValue,
        monsterHealth: this.monsterHealth,
        playerHealth: this.playerHealth,
      };

      this.battleLog.push(actionLogEntry);

      this.attackPlayer();

      this.rounds += 1;
    },

    gameOver(winner) {
      alert(`game over, ${winner} wins`);

      this.resetGame();
    },

    heal(patient) {
      const patientHealth = `${patient}Health`;

      const rivalHealth =
        patient === "player" ? "monsterHealth" : "playerHealth";

      const healValue = getRandomValue(12, 8);

      this[patientHealth] += healValue;

      this[rivalHealth] += Math.floor(healValue / 2);

      const actionLogEntry = {
        action: "heal",
        executioner: "player",
        damage: healValue,
        monsterHealth: this.monsterHealth,
        playerHealth: this.playerHealth,
      };

      this.battleLog.push(actionLogEntry);
    },

    surrender(traitor, winner) {
      const traitorHealth = `${traitor}Health`;

      this[traitorHealth] = 0;

      alert(`${traitor} surrenders, ${winner} wins`);

      this.resetGame();
    },

    resetGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.rounds = 0;
      this.battleLog = [];
    },
  },

  computed: {
    monsterStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    playerstyles() {
      return { width: `${this.playerHealth}%` };
    },
  },
}).mount("#game");

function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

//   function isPrimeNumber(maxNumber) {}
