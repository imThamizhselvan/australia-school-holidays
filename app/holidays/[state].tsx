import { Text, View, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

interface Holiday {
  name: string;
  date: string;
  stateSpecific: boolean;
}

interface SchoolTerm {
  term: number;
  start: string;
  end: string;
}

interface SchoolHoliday {
  period: number,
  start: string,
  end: string
}

const schoolHolidays2025: Record<string, SchoolHoliday[]> = {
  NSW: [
    { period: 1, start: "2024-12-20", end: "2025-01-27" },  // Summer holidays
    { period: 2, start: "2025-04-12", end: "2025-04-27" },  // Autumn holidays
    { period: 3, start: "2025-07-05", end: "2025-07-20" },  // Winter holidays
    { period: 4, start: "2025-09-27", end: "2025-10-12" }   // Spring holidays
  ],
  VIC: [
    { period: 1, start: "2024-12-20", end: "2025-01-27" },  // Summer holidays
    { period: 2, start: "2025-03-29", end: "2025-04-13" },  // Autumn holidays
    { period: 3, start: "2025-06-28", end: "2025-07-13" },  // Winter holidays
    { period: 4, start: "2025-09-20", end: "2025-10-05" }   // Spring holidays
  ],
  QLD: [
    { period: 1, start: "2024-12-13", end: "2025-01-27" },  // Summer holidays
    { period: 2, start: "2025-04-05", end: "2025-04-20" },  // Autumn holidays
    { period: 3, start: "2025-06-28", end: "2025-07-13" },  // Winter holidays
    { period: 4, start: "2025-09-20", end: "2025-10-06" }   // Spring holidays
  ],
  WA: [
    { period: 1, start: "2024-12-20", end: "2025-01-30" },  // Summer holidays
    { period: 2, start: "2025-04-12", end: "2025-04-28" },  // Autumn holidays
    { period: 3, start: "2025-07-06", end: "2025-07-21" },  // Winter holidays
    { period: 4, start: "2025-09-28", end: "2025-10-13" }   // Spring holidays
  ],
  SA: [
    { period: 1, start: "2024-12-14", end: "2025-01-28" },  // Summer holidays
    { period: 2, start: "2025-04-13", end: "2025-04-28" },  // Autumn holidays
    { period: 3, start: "2025-07-06", end: "2025-07-21" },  // Winter holidays
    { period: 4, start: "2025-09-28", end: "2025-10-13" }   // Spring holidays
  ],
  TAS: [
    { period: 1, start: "2024-12-20", end: "2025-02-06" },  // Summer holidays
    { period: 2, start: "2025-04-13", end: "2025-04-28" },  // Autumn holidays
    { period: 3, start: "2025-07-06", end: "2025-07-21" },  // Winter holidays
    { period: 4, start: "2025-09-28", end: "2025-10-13" }   // Spring holidays
  ],
  NT: [
    { period: 1, start: "2024-12-13", end: "2025-01-28" },  // Summer holidays
    { period: 2, start: "2025-04-06", end: "2025-04-14" },  // Autumn holidays
    { period: 3, start: "2025-06-22", end: "2025-07-14" },  // Winter holidays
    { period: 4, start: "2025-09-21", end: "2025-10-06" }   // Spring holidays
  ],
  ACT: [
    { period: 1, start: "2024-12-18", end: "2025-02-04" },  // Summer holidays
    { period: 2, start: "2025-04-13", end: "2025-04-28" },  // Autumn holidays
    { period: 3, start: "2025-07-06", end: "2025-07-21" },  // Winter holidays
    { period: 4, start: "2025-09-28", end: "2025-10-13" }   // Spring holidays
  ]
};

const publicHolidays2025: Record<string, Holiday[]> = {
  // National holidays (all states)
  national: [
    { name: "New Year's Day", date: "2025-01-01", stateSpecific: false },
    { name: "Australia Day", date: "2025-01-27", stateSpecific: false },
    { name: "Good Friday", date: "2025-04-18", stateSpecific: false },
    { name: "Easter Monday", date: "2025-04-21", stateSpecific: false },
    { name: "ANZAC Day", date: "2025-04-25", stateSpecific: false },
    { name: "Christmas Day", date: "2025-12-25", stateSpecific: false },
    { name: "Boxing Day", date: "2025-12-26", stateSpecific: false }
  ],
  // State-specific holidays
  NSW: [
    { name: "King's Birthday", date: "2025-06-09", stateSpecific: true },
    { name: "Labour Day", date: "2025-10-06", stateSpecific: true }
  ],
  VIC: [
    { name: "Labour Day", date: "2025-03-10", stateSpecific: true },
    { name: "King's Birthday", date: "2025-06-09", stateSpecific: true },
    { name: "AFL Grand Final Friday", date: "2025-09-26", stateSpecific: true },
    { name: "Melbourne Cup Day", date: "2025-11-04", stateSpecific: true }
  ],
  QLD: [
    { name: "Labour Day", date: "2025-05-06", stateSpecific: true },
    { name: "Royal Queensland Show (Brisbane)", date: "2025-08-14", stateSpecific: true },
    { name: "King's Birthday", date: "2025-10-06", stateSpecific: true }
  ],
  WA: [
    { name: "Labour Day", date: "2025-03-04", stateSpecific: true },
    { name: "Western Australia Day", date: "2025-06-03", stateSpecific: true },
    { name: "King's Birthday", date: "2025-09-30", stateSpecific: true }
  ],
  SA: [
    { name: "Adelaide Cup Day", date: "2025-03-11", stateSpecific: true },
    { name: "King's Birthday", date: "2025-06-09", stateSpecific: true },
    { name: "Labour Day", date: "2025-10-06", stateSpecific: true }
  ],
  TAS: [
    { name: "Eight Hours Day", date: "2025-03-11", stateSpecific: true },
    { name: "King's Birthday", date: "2025-06-09", stateSpecific: true },
    { name: "Royal Hobart Show", date: "2025-10-24", stateSpecific: true }
  ],
  NT: [
    { name: "May Day", date: "2025-05-06", stateSpecific: true },
    { name: "King's Birthday", date: "2025-06-09", stateSpecific: true },
    { name: "Picnic Day", date: "2025-08-05", stateSpecific: true }
  ],
  ACT: [
    { name: "Canberra Day", date: "2025-03-11", stateSpecific: true },
    { name: "Reconciliation Day", date: "2025-05-27", stateSpecific: true },
    { name: "King's Birthday", date: "2025-06-09", stateSpecific: true },
    { name: "Labour Day", date: "2025-10-06", stateSpecific: true }
  ]
};

const holidayPeriodNames = {
  1: "Summer Holiday",
  2: "Autumn Holiday",
  3: "Winter Holiday",
  4: "Spring Holiday"
};

function getHolidaysForState(state: string) {
  const allHolidays = [...publicHolidays2025.national, ...publicHolidays2025[state]];
  return allHolidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Add this function to format dates
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AU');
}

// Add this before the Holidays component
const holidaysData: Record<string, {
  terms: Record<string, {
    dates: string;
    holidays: Holiday[];
  }>;
}> = {};

// Process the data for each state
Object.keys(schoolHolidays2025).forEach(state => {
  holidaysData[state] = {
    terms: {}
  };
  
  schoolHolidays2025[state].forEach(term => {
    const termHolidays = getHolidaysForState(state).filter(holiday => {
      const holidayDate = new Date(holiday.date);
      const termStart = new Date(term.start);
      const termEnd = new Date(term.end);
      return holidayDate >= termStart && holidayDate <= termEnd;
    });

    holidaysData[state].terms[holidayPeriodNames[term.period]] = {
      dates: `${formatDate(term.start)} - ${formatDate(term.end)}`,
      holidays: termHolidays
    };
  });
});

export default function Holidays() {
  const router = useRouter();
  const { state } = useLocalSearchParams();

  const selectedStateData = holidaysData[state];

  return (
    <View style={{ flex: 1, backgroundColor: '#e0f7fa' }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#00796b' }}>
            Holidays for {state}
        </Text>

        {selectedStateData ? (
          Object.entries(selectedStateData.terms).map(([term, data]) => (
            <View key={term} style={{ marginBottom: 20, backgroundColor: '#fff3e0', borderRadius: 10, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#d32f2f' }}>
                {term}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 4, color: '#616161' }}>
                Dates: {data.dates}
              </Text>
              {data.holidays.length > 0 && (
                <>
                  <Text style={{ fontSize: 16, marginBottom: 4, color: '#616161' }}>
                    Public Holidays:
                  </Text>
                  {data.holidays.map((holiday, index) => (
                    <Text key={index} style={{ fontSize: 16, marginBottom: 4, marginLeft: 10, color: '#1976d2' }}>
                      <Ionicons name="star" size={16} color="#ffb300" /> {holiday.name} ({formatDate(holiday.date)})
                      {holiday.stateSpecific ? " (State)" : " (National)"}
                    </Text>
                  ))}
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 18, color: '#d32f2f' }}>No holidays found for this state.</Text>
        )}
      </ScrollView>
    </View>
  );
} 