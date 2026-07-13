import { Card } from "@mui/material";
import { Diagnosis, Entry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { useEffect, useState } from "react";
import diagnosisService from "../services/diagnosisService";

const EveryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnosis, setDianosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDianosis(diagnosis);
    };

    void fetch();
  }, []);

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Card
          sx={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            {entry.date} <MedicalInformationIcon />
          </p>
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnosis.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
          <p>diagnose by {entry.specialist}</p>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card
          sx={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            {entry.date} <WorkIcon />
            FBI
          </p>
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnosis.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
          <p>diagnose by ${entry.specialist}</p>
        </Card>
      );
    case "Hospital":
      return (
        <Card
          sx={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnosis.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
          <p>diagnose by {entry.specialist}</p>
          <p>{entry.discharge.criteria}</p>
        </Card>
      );

    default:
      break;
  }
};

export default EveryDetails;
