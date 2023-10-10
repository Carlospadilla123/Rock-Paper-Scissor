import { Winner, calculateWinner, generateRandomWeaponPick, weapons } from '@/views/script'
import { describe, expect, test } from 'vitest'


describe('Given a game that have playing answers rock, paper, scissors, lizard, spock', () => {
  const rock = weapons[0]
  const paper = weapons[1]
  const scissors = weapons[2]
  const lizard = weapons[3]
  const spock = weapons[4]
  describe('when rock for the player and machine got paper', () => {
    test('then, the player should be lose, expect machine wins', () => {
      const result = calculateWinner(rock, paper)
      console.log(result)
      expect(result).toBe(Winner.MACHINE)
    })
  })
  describe('when paper for the player and machine got lizard', () => {
    test('then, the player should be lose, expect machine wins', () => {
      const result = calculateWinner(paper, lizard)
      console.log(result)
      expect(result).toBe(Winner.MACHINE)
    })
  })
  describe('when spock for the player and machine got rock', () => {
    test('then, the player should be winner, expect machine lose', () => {
      const result = calculateWinner(spock, rock)
      console.log(result)
      expect(result).toBe(Winner.PLAYER)
    })
  })
  describe('when scissors for the player and machine got scissors', () => {
    test('then, the player and the machine should draw', () => {
      const result = calculateWinner(scissors, scissors)
      console.log(result)
      expect(result).toBe(Winner.DRAW)
    })
  })

  describe('when machine choose an option', () => {
    test('then, that option should be one of the available ones', () => {
      const result = generateRandomWeaponPick()
      console.log(result)
      expect(weapons.some(weapon => weapon.value === result.value)).toBe(true)
    })
  })
})
