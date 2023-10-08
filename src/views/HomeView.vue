<script setup lang="ts">
import { reactive } from 'vue';
import Participant from '../components/Participant.vue'

enum WeaponsType {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSOR = "SCISSOR"
}

enum Winner {
  PLAYER = "PLAYER",
  MACHINE = "MACHINE",
  DRAW = "DRAW"
}

enum MatchState {
  WINNER = "WINNER",
  LOOSER = 'LOOSER',
  DRAW = "DRAW"
}

const weapons:IWeapon[] = [
  {
    icon: "&#128511;",
    value: WeaponsType.ROCK,
    weakness: [WeaponsType.PAPER],
    strengths: [WeaponsType.SCISSOR]
  },
  {
    icon: "&#129531;",
    value: WeaponsType.PAPER,
    weakness: [WeaponsType.SCISSOR],
    strengths: [WeaponsType.ROCK]
  },
  {
    icon: "&#9986;&#65039;",
    value: WeaponsType.SCISSOR,
    weakness: [WeaponsType.ROCK],
    strengths: [WeaponsType.PAPER]
  },
]

const playersState = reactive<{
  isLoading: boolean;
  playerSelection: IWeapon | null,
  machineSelection: IWeapon | null,
  winner: Winner | null
}>({
  isLoading: false,
  playerSelection: null,
  machineSelection: null,
  winner: null
})

const handleWeaponPick = (weapon:IWeapon):void => {
  const playerSelection = weapon

  playersState.isLoading = true
  playersState.winner = null
  playersState.machineSelection = null
  playersState.playerSelection = playerSelection
  
  setTimeout(()=> {
    const machinePick = generateRandomWeaponPick()
    playersState.machineSelection = machinePick
    playersState.winner = calculateWinner(playerSelection as IWeapon, machinePick)
    playersState.isLoading = false
  }, 1000)

}

const calculateWinner = (player:IWeapon, machine:IWeapon):Winner  => {
  if (machine.strengths.includes(player.value)) return Winner.MACHINE
  else if (machine.weakness.includes(player.value)) return Winner.PLAYER
  return Winner.DRAW
}

const generateRandomWeaponPick = ():IWeapon => {
  const choose = Math.floor(Math.random() * weapons.length - 0.1)
  return weapons[choose]
}

export interface IWeapon {
  icon: string;
  value: WeaponsType;
  weakness: WeaponsType[];
  strengths: WeaponsType[];
}


</script>

<template>
  <main>

    <section class="header">
      <h1 class="header__title">Lest play Rock Paper Scissor !!!</h1>
    </section>
    <section class="content">
      <Participant :title="'Player'" 
      :disable="playersState.isLoading" 
      :description="playersState.isLoading?'':'Choose a weapon!'" 
      :weapons="weapons" 
      @onSelect="handleWeaponPick" 
      :winner="playersState.winner===Winner.PLAYER"
      :looser="playersState.winner===Winner.MACHINE"
      :draw="playersState.winner===Winner.DRAW"
      :currentSelection="(playersState.playerSelection as IWeapon)"/>

      <Participant 
      :title="'Machine'" 
      :disable="playersState.isLoading" 
      :description="playersState.isLoading?'Thinking ...':''" 
      :weapons="weapons"
      :winner="playersState.winner===Winner.MACHINE"
      :looser="playersState.winner===Winner.PLAYER"
      :draw="playersState.winner===Winner.DRAW" 
      :currentSelection="(playersState.machineSelection as IWeapon)"/>
    
    </section>
  </main>
</template>

<style>
  /* GLOBAL */
  * {
    color: #fff;
  }
  .disabled {
      opacity: .5;
  }
  button {
    background-color: cornflowerblue;
    border-radius: 5px;
    padding: 16px;
    border: none;

  }
  button:hover {
    opacity: 0.7;
  }
  button:active {
    opacity: 0.5;
    
  }
  /* TITLE */
  .header__title {}

  /* CONTENT */
  .content {
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
  }
  
  /* PLAY BUTTON */
  .footer__play-button {
    width: 300px;
    height: 50px;
  }
  .footer__play-button__text {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
</style>