import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

const ticketCollectionRef = collection(db, "tickets");
const completedTicketCollectionRef = collection(db, "completedTickets");

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

export async function UpdateTicket(ticketId, updatedTicketData) {
  try {
    console.log('entrou em update')
    const ticketDoc = doc(db, "tickets", ticketId);
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

export async function GetCompletedUserTickets(userId) {
  const userQuery = query(completedTicketCollectionRef, where("userId", "==", userId));

  const data = await getDocs(userQuery);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function completeTicket(ticketData) {
  try {
    await addDoc(completedTicketCollectionRef, ticketData);
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteCompletedTicket(ticketId) {
  try {
    const ticketDoc = doc(db, "completedTickets", ticketId);
    await deleteDoc(ticketDoc);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    return "";
  }
}
