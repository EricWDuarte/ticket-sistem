import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { DateFormater } from "../utils/DateFormater";

const ticketCollectionRef = collection(db, "tickets");
const completedTicketCollectionRef = collection(db, "completedTickets");

const historyRef = collection(db, "history");

export async function CreateUserHistory(userId) {
  const userQuery = query(historyRef, where("userId", "==", userId));

  const firstHistoryEntry = {
    userId: userId,
    actions: [],
  };

  try {
    const result = await getDocs(userQuery);
    if (result.docs.length === 0) {
      addDoc(historyRef, firstHistoryEntry);
    }
  } catch (err) {
    console.log("error", err);
  }
}

export async function GetUserHistory(userId) {
  const userQuery = query(historyRef, where("userId", "==", userId));

  const data = await getDocs(userQuery);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function UpdateUserHistory(userId, newHistory, data) {
  const history = await GetUserHistory(userId);
  const frase = newHistory + " " + DateFormater(new Date());

  const entry = {
    frase: frase,
    data: data,
  };
  history[0].actions.unshift(entry);
  const historyDoc = doc(db, "history", history[0].id);

  try {
    await updateDoc(historyDoc, { actions: history[0].actions });
  } catch (err) {
    console.log("error", err);
  }
}

export async function GetUserTickets(userId) {
  const userQuery = query(ticketCollectionRef, where("userId", "==", userId));

  const data = await getDocs(userQuery);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function CreateTicket(ticketData) {
  try {
    await addDoc(ticketCollectionRef, ticketData);
  } catch (err) {
    console.log(err);
  }
}

export async function CreateTicketAndAddToHistory(ticketData, userId) {
  try {
    await addDoc(ticketCollectionRef, ticketData);
    await UpdateUserHistory(userId, `Ticket Created ${ticketData.title}`, ticketData);
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateTicket(userId, ticketId, updatedTicketData) {
  try {
    console.log("entrou em update");
    const ticketDoc = doc(db, "tickets", ticketId);
    await UpdateUserHistory(userId, `Ticket Updated ${updatedTicketData.title}`, updatedTicketData);
    await updateDoc(ticketDoc, updatedTicketData);
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteTicket(ticketId) {
  try {
    const ticketDoc = doc(db, "tickets", ticketId);
    await deleteDoc(ticketDoc);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    return "";
  }
}

export async function DeleteTicketAndAddToHistory(ticketId, userId) {
  try {
    const ticketDocRef = doc(db, "tickets", ticketId);
    const ticketDoc = await getDoc(ticketDocRef);
    await UpdateUserHistory(userId, `Ticket Deleted ${ticketDoc.data().title}`, ticketDoc.data());
    await deleteDoc(ticketDocRef);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    return "";
  }
}

export async function GetCompletedUserTickets(userId) {
  const userQuery = query(
    completedTicketCollectionRef,
    where("userId", "==", userId)
  );

  const data = await getDocs(userQuery);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function completeTicket(ticketData, userId) {
  try {
    console.log('ticketData', ticketData)
    await UpdateUserHistory(userId, `Ticket Completed ${ticketData.title}`, ticketData);
    await addDoc(completedTicketCollectionRef, ticketData);
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteCompletedTicket(ticketId, userId, data, history) {
  try {
    const ticketDoc = doc(db, "completedTickets", ticketId);
    await UpdateUserHistory(userId, history + " " + data.title, data);
    await deleteDoc(ticketDoc);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    return "";
  }
}


