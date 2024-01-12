import {toRaw} from "vue";

export function saveLocalStorage(key, data) {
  const compareDate = (a, b) => {
    const [dayA, monthA, yearA] = a.dateCreated.split('/')
    const dateA = new Date(dayA, monthA, yearA)

    const [dayB, monthB, yearB] = b.dateCreated.split('/')
    const dateB = new Date(dayB, monthB, yearB)

    if (dateA < dateB) {
      return -1
    } else if (dateA > dateB) {
      return 1
    } else {
      return 0
    }
  }

  localStorage.setItem(key, JSON.stringify(toRaw(data).sort(compareDate)));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}