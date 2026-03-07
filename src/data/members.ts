export interface JCMember {
  name: string;
  credentials: string;
  role: "President" | "Vice-President" | "Secretary" | "Member" | "Alternate";
  type: "C" | "L"; // Clergy or Lay
}

export const OFFICERS: JCMember[] = [
  { name: "Rev. Dr. Susan Henry-Crowe", credentials: "M.Div., D.D", role: "President", type: "C" },
  { name: "Bill Waddell", credentials: "J.D.", role: "Vice-President", type: "L" },
  { name: "Rev. Angela Brown", credentials: "J.D., M.Div.", role: "Secretary", type: "C" },
];

export const MEMBERS: JCMember[] = [
  { name: "Harriett Jane Olson", credentials: "JD", role: "Member", type: "L" },
  { name: "Rev. Jonathan R. Ulanday", credentials: "M.Div.", role: "Member", type: "C" },
  { name: "Molly Hiekoni Mwayera", credentials: "LL.B., HB.L.", role: "Member", type: "L" },
  { name: "Rev. Taylor Walters Denyer", credentials: "DTh., MDiv.", role: "Member", type: "C" },
  { name: "Rev. Tim Bruster", credentials: "D.M., M.Div.", role: "Member", type: "C" },
  { name: "Andrew Vorbrich", credentials: "J.D.", role: "Member", type: "L" },
];

export const ALTERNATES: JCMember[] = [
  { name: "Rev. Paul Perez", credentials: "M.Div., MBA", role: "Alternate", type: "C" },
  { name: "Rev. Beverly Wilkes Null", credentials: "D.M.", role: "Alternate", type: "C" },
  { name: "Rev. Mark C. Grafenreed", credentials: "M.Div., J.D.", role: "Alternate", type: "C" },
  { name: "Kate Croskery-Jones", credentials: "Ph.D., M.Div., J.D.", role: "Alternate", type: "C" },
  { name: "Erin Hawkins", credentials: "", role: "Alternate", type: "L" },
  { name: "Jessica Vittorio", credentials: "J.D.", role: "Alternate", type: "L" },
  { name: "Kent Fulton", credentials: "J.D.", role: "Alternate", type: "L" },
  { name: "Thomas Lee", credentials: "J.D.", role: "Alternate", type: "L" },
  { name: "Laurie Day", credentials: "M.A., MNM", role: "Alternate", type: "L" },
];

export const STATS = {
  totalDecisions: 1473,
  yearStart: 1940,
  yearEnd: 2025,
  methodistChurchEra: { start: 1, end: 255, years: "1940–1968" },
  umcEra: { start: 301, end: 1520, years: "1968–present" },
};
