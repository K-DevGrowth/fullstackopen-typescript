import {
  TextField,
  Button,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import patientService from "../services/patients";
import axios from "axios";
import {
  HealthCheckRating as HealthCheckRatingValues,
  type HealthCheckRating as HealthCheckRatingType,
  type Entry,
  type Patient,
} from "../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const codes = [
  "M24.2",
  "M51.2",
  "S03.5",
  "J10.1",
  "J06.9",
  "Z57.1",
  "N30.0",
  "H54.7",
  "J03.0",
  "L60.1",
  "Z74.3",
  "L20",
  "F43.2",
  "S62.5",
  "H35.29",
];

function getStyles(code: string, diagnosis: string[], theme: Theme) {
  return {
    fontWeight: diagnosis.includes(code)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface AddEntryFormProps {
  patient: Patient;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
}

const AddEntryForm = ({
  patient,
  setIsOpen,
  setPatient,
}: AddEntryFormProps) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRatingType>(HealthCheckRatingValues.Healthy);
  const [diagnosis, setDiagnosis] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const theme = useTheme();

  const handleChange = (event: { target: { value: string | string[] } }) => {
    const {
      target: { value },
    } = event;
    setDiagnosis(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newEntry = await patientService.createEntry(patient.id, {
        type,
        date,
        description,
        specialist,
        diagnosisCodes: diagnosis,
        ...(type === "HealthCheck"
          ? { healthCheckRating }
          : type === "OccupationalHealthcare"
            ? {
                employerName: "",
                sickLeave: { startDate: date, endDate: date },
              }
            : { discharge: { date, criteria: "" } }),
      } as Entry);
      setPatient((currentPatient) => {
        if (!currentPatient) {
          return null;
        }

        return {
          ...currentPatient,
          entries: [...currentPatient.entries, newEntry],
        };
      });
      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        if (
          responseData &&
          typeof responseData === "object" &&
          "error" in responseData &&
          Array.isArray(responseData.error)
        ) {
          setError(
            responseData.error
              .map((item: unknown) =>
                typeof item === "object" && item && "message" in item
                  ? String(item.message)
                  : "Unknown error",
              )
              .join(", "),
          );
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  return (
    <div>
      <h3>New HealthCheck Entry</h3>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <InputLabel id="type-select">Type</InputLabel>
          <Select
            size="small"
            sx={{ margin: "5px 0" }}
            labelId="type-select"
            id="type-select"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Date"
          variant="outlined"
          id="Date"
          size="small"
          sx={{ display: "block", margin: "5px 0" }}
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          variant="outlined"
          label="Description"
          id="Description"
          size="small"
          sx={{ display: "block", margin: "5px 0" }}
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          variant="outlined"
          label="Specialist"
          id="Specialist"
          size="small"
          sx={{ display: "block", margin: "5px 0" }}
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="health-select">
            Health Check Rating (0-3) *
          </InputLabel>
          <Select
            labelId="health-select"
            id="health-select"
            size="small"
            sx={{ margin: "5px 0" }}
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(
                Number(target.value) as HealthCheckRatingType,
              )
            }
          >
            <MenuItem value={0}>0 - Healthy</MenuItem>
            <MenuItem value={1}>1 - Low Risk</MenuItem>
            <MenuItem value={2}>2 - High Risk</MenuItem>
            <MenuItem value={3}>3 - Critical Risk</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-multiple-DiagnosisCodes-label">
            DiagnosisCodes
          </InputLabel>
          <Select
            size="small"
            labelId="demo-multiple-DiagnosisCodes-label"
            id="demo-multiple-DiagnosisCodes"
            multiple
            value={diagnosis}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-DiagnosisCodes"
                label="DiagnosisCodes"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {codes.map((code) => (
              <MenuItem
                key={code}
                value={code}
                style={getStyles(code, diagnosis, theme)}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ margin: "10px" }}>
          Add
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsOpen(false)}
        >
          Cancle
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
