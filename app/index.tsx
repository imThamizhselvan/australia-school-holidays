import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const states = [
    { name: "NSW", fullName: "New South Wales" },
    { name: "VIC", fullName: "Victoria" },
    { name: "QLD", fullName: "Queensland" },
    { name: "WA", fullName: "Western Australia" },
    { name: "SA", fullName: "South Australia" },
    { name: "TAS", fullName: "Tasmania" },
    { name: "ACT", fullName: "Australian Capital Territory" },
    { name: "NT", fullName: "Northern Territory" },
  ];

  const colors = [
    '#FF9999', // Light red
    '#99FF99', // Light green
    '#9999FF', // Light blue
    '#FFFF99', // Light yellow
    '#FF99FF', // Light purple
    '#99FFFF', // Light cyan
    '#FFB366', // Light orange
    '#C2C2F0', // Light periwinkle
  ];

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 10,
      }}
    >
      {states.map((state, index) => (
        <TouchableOpacity 
          key={index} 
          style={{ 
            width: 100,
            height: 100,
            margin: 10, 
            padding: 20, 
            backgroundColor: colors[index],
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRadius: 10,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          onPress={() => router.push(`/holidays/${state.name}`)}
        >
          <Text style={{ fontWeight: 'bold' }}>{state.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
