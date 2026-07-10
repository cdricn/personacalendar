export function LeftButton() {
  return (
    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.4082 1.40839L6.4082 7.40839L1.4082 13.4084" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  )
}

export function RightButton() {
  return (
    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.30176 1.40839L1.30176 7.40839L6.30176 13.4084" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  )
}

export function DownButton() {
  return (
    <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.4082 1.40839L7.4082 6.40839L13.4082 1.40839" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  )
}

export function UpButton() {
  return (
    <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.4082 6.3017L7.4082 1.3017L13.4082 6.3017" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  )
}

export function Stripes() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id="pattern_KOAtP" patternUnits="userSpaceOnUse" width="9" height="8" patternTransform="rotate(45)">
          <line x1="0" y="0" x2="0" y2="8" strokeWidth="6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern_KOAtP)" opacity="1" />
    </svg>
  )
}