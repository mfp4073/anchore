const baseUrl = 'http://localhost:5000';

export const getAllPeople = async () => {
  const res = await fetch(`${baseUrl}/people`);
  const people = await res.json();
  return people;
};

export const getPerson = async (id) => {
  const res = await fetch(`${baseUrl}/people/${id}`);
  const person = await res.json();
  return person;
};

export const addPerson = async (person) => {
  const res = await fetch(`${baseUrl}/people`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  const newPerson = await res.json();
  return newPerson;
};

export const editPerson = async (person) => {
  const res = await fetch(`${baseUrl}/people/${person.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  const updatedPerson = await res.json();
  return updatedPerson;
};

export const deletePerson = async (id) => {
  await fetch(`${baseUrl}/people/${id}`, {
    method: 'DELETE',
  });
};
