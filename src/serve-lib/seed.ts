import { User, fields } from "@client-lib";
import { CONST } from "./constants";
import { db } from "./db";

const names = [
  'Magret Beanny',
  'Leo Standon',
  'Marcelo Kindamento',
  'Patel Filipe',
  'Hermes Audren',
  'Swis Standem',
  'James Simons',
  'Bockley Ribbon',
  'Mao Chang',
  'Larcia Gai',
  'Comobe Bernerd',
  'Indones Julian'
]

function pickRandFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const INSERT_USERS = Array(5).fill(0).map((_, i) => ({
  email: `user${i + 1}@gmail.com`,
  password: '$argon2id$v=19$m=65536,t=3,p=4$VC0zHyZYY/uRe6Sbj4Veuw$4QPCKFdblBTH/b56xA/7Q8ZHNuIVlVUY8lqX59itra0',
  name: names[i],
}))

const INSERT_DOCTORS = names.map((name, i) => ({
  email: `doctor${i + 1}@gmail.com`,
  password: '$argon2id$v=19$m=65536,t=3,p=4$VC0zHyZYY/uRe6Sbj4Veuw$4QPCKFdblBTH/b56xA/7Q8ZHNuIVlVUY8lqX59itra0',
  name,
  visit_type: i % 2 ? 'In-person' : 'Virtual',
  field: fields[i].n,
  abbr: fields[i].s,
  bio: 'lorem ipsum dolor sit amet, consectetur adip loremlorem ipsum dolor sit amet, consectetur adip lorem lorem ipsum dolor sit amet, consectetur adip lorem lorem ipsum dolor sit amet, consectetur adip lorem lorem ipsum dolor sit amet, consectetur adip lorem',
  image: `/md${i + 1}.png`,
  available_date: Array(10).fill(0).map(() => `2023-07-${19 + i}`),
  available_time: Array(10).fill(0).map((_, s) => `${10 + s}:30`),
}))

const INSERT_FIELDS = fields.map((field) => ({
  name: field.n,
  abbr: field.s,
}))

export const SEED_DATABASE = async () => {
  const prior = await db.select('id').from<User>(CONST.USER_TABLE).limit(1)
  if (!prior.length) {
    await db.batchInsert(CONST.USER_TABLE, INSERT_USERS)
    await db.batchInsert(CONST.DOCTOR_TABLE, INSERT_DOCTORS)
    await db.batchInsert(CONST.DOCTOR_FIELD_TABLE, INSERT_FIELDS)
  }
}