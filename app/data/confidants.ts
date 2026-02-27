import p5confidants from './p5_confidants.json'

export function GetConfidants(game:string) {

  switch(game) {
    case 'persona5_royal':
      return p5confidants;
  }
}