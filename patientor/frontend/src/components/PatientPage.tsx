import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EveryDetails from "./EveryDetails";
import { Button } from "@mui/material";
import AddEntryForm from "./AddEntryForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    patientService.getOne(id).then((data) => setPatient(data));
  }, [id]);

  return (
    <div>
      {patient && (
        <div>
          <h2>
            {patient.name}{" "}
            {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <p>date of birth: {patient.dateOfBirth}</p>

          <h3>entries</h3>
          <div>
            {patient.entries.map((entry) => (
              <EveryDetails key={entry.id} entry={entry} />
            ))}

            {isOpen ? (
              <AddEntryForm patient={patient} setIsOpen={setIsOpen} setPatient={setPatient} />
            ) : (
              <Button variant="contained" onClick={() => setIsOpen(!isOpen)}>
                Add new entry
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPage;
