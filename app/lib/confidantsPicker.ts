import p5confidants from '../data/p5_confidants.json'

export function GetConfidants(game:string) {

  switch(game) {
    case 'persona5_royal':
      return p5confidants;
  }
}