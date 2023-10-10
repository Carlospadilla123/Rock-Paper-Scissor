export enum WeaponsType {
    ROCK = "ROCK",
    PAPER = "PAPER",
    SCISSOR = "SCISSOR",
    LIZARD = "LIZARD",
    SPOCK = "SPOCK"
  }
  
export enum Winner {
    PLAYER = "PLAYER",
    MACHINE = "MACHINE",
    DRAW = "DRAW"
}

export interface IWeapon {
    icon: string;
    value: WeaponsType;
    weakness: WeaponsType[];
    strengths: WeaponsType[];
}
  
export const weapons:IWeapon[] = [
    {
      icon: "&#128511;",
      value: WeaponsType.ROCK,
      weakness: [WeaponsType.PAPER, WeaponsType.SPOCK],
      strengths: [WeaponsType.SCISSOR, WeaponsType.LIZARD]
    },
    {
      icon: "&#129531;",
      value: WeaponsType.PAPER,
      weakness: [WeaponsType.SCISSOR, WeaponsType.SPOCK],
      strengths: [WeaponsType.ROCK, WeaponsType.LIZARD]
    },
    {
      icon: "&#9986;&#65039;",
      value: WeaponsType.SCISSOR,
      weakness: [WeaponsType.ROCK, WeaponsType.SPOCK],
      strengths: [WeaponsType.PAPER, WeaponsType.LIZARD]
    },
    {
        icon: "&#129422;",
        value: WeaponsType.LIZARD,
        weakness: [WeaponsType.ROCK, WeaponsType.SCISSOR],
        strengths: [WeaponsType.PAPER, WeaponsType.SPOCK]
    },
    {
        icon: "&#128406;",
        value: WeaponsType.SPOCK,
        weakness: [WeaponsType.PAPER, WeaponsType.LIZARD],
        strengths: [WeaponsType.SCISSOR, WeaponsType.ROCK]
    },
]


export const calculateWinner = (player:IWeapon, machine:IWeapon):Winner  => {
    if (machine.strengths.includes(player.value)) return Winner.MACHINE
    else if (machine.weakness.includes(player.value)) return Winner.PLAYER
    return Winner.DRAW
  }
  
export const generateRandomWeaponPick = ():IWeapon => {
    const choose = Math.floor(Math.random() * weapons.length - 0.1)
    return weapons[choose]
}