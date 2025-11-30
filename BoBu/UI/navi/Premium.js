// screens/Premium.js
import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Premium({ route, navigation }) {
  const { property, isPremium } = route.params || {};
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    if (!property) return;

    // Generate random visitors for demo
    const randomVisitors = [
      { id: "v1", name: "Johnro Soy co.", email: "pertingOTuga@gmail.com", phone: "0917-111-2222", interest: `Viewing ${property.name}`, avatar: require("../../assets/visitor1.jpg") },
      { id: "v2", name: "Maryan Nabahala", email: "MarsJupiter@gmail.com", phone: "0918-333-4444", interest: `Viewing ${property.name}`, avatar: require("../../assets/visitor2.jpg") },
      { id: "v3", name: "Ryunn Mahogany", email: "Remember.Me@gmail.com", phone: "0920-555-6666", interest: `Viewing ${property.name}`, avatar: require("../../assets/visitor3.jpg") },
      { id: "v4", name: "Kaylie Jumela", email: "nannonaha@gmail.com", phone: "0917-777-8888", interest: `Viewing ${property.name}`, avatar: require("../../assets/visitor4.jpg") },
    ];

    const shuffled = randomVisitors.sort(() => 0.5 - Math.random());
    setVisitors(shuffled.slice(0, 2));
  }, [property]);

  const renderVisitor = ({ item }) => (
    <View style={styles.visitorCard}>
      <Image source={item.avatar} style={styles.visitorAvatar} />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.visitorName}>{item.name}</Text>
        <Text style={styles.visitorInterest}>{item.interest}</Text>
        <Text style={styles.visitorDetails}>Email: {item.email}</Text>
        <Text style={styles.visitorDetails}>Phone: {item.phone}</Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <View>
      <Text style={styles.title}>
        Premium Analytics & Visitors for {property?.name || "Property"}
      </Text>

      {/* Premium Info Box */}
      {isPremium && property && (
        <View style={styles.premiumBox}>
          <Text style={styles.premiumTitle}>Premium Property Info</Text>
          <Text style={styles.premiumText}>Location: {property.location || "Unknown"}</Text>
          <Text style={styles.premiumText}>Monthly Rent: {property.rent || "N/A"}</Text>
          <Text style={styles.premiumText}>Rating: {property.rating?.toFixed(1) || "N/A"} ⭐</Text>
          <Text style={styles.premiumText}>Total Visitors: {visitors.length}</Text>
        </View>
      )}

      {/* Analytics Chart */}
      {isPremium && property?.analytics && (
        <View style={styles.graphBox}>
          <Text style={styles.graphTitle}>Occupancy Analytics (Past 6 Months)</Text>
          <LineChart
            data={{
              labels: property.analytics.months || [],
              datasets: [{ data: property.analytics.occupancy?.map(v => v * 100) || [] }],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: "#1d1d82",
              backgroundGradientFrom: "#1d1d82",
              backgroundGradientTo: "#3b3bbf",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 12 },
              propsForDots: { r: "4", strokeWidth: "2", stroke: "#ffc107" },
            }}
            style={{ marginVertical: 8, borderRadius: 12, alignSelf: "center" }}
          />
        </View>
      )}

      <Text style={[styles.title, { marginTop: 20 }]}>Visitors</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/bg2.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <FlatList
        data={visitors}
        keyExtractor={(item) => item.id}
        renderItem={renderVisitor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  title: { fontSize: 20, fontWeight: "700", color: "#FFD700", textAlign: "center", marginBottom: 12 },
  premiumBox: { marginVertical: 10, backgroundColor: "#2a2a9a", borderRadius: 12, padding: 12 },
  premiumTitle: { fontSize: 16, fontWeight: "700", color: "#ffc107", marginBottom: 6, textAlign: "center" },
  premiumText: { fontSize: 14, color: "#fff", marginBottom: 4 },
  graphBox: { marginVertical: 10, backgroundColor: "#2c2c9c", borderRadius: 12, padding: 12 },
  graphTitle: { color: "#fff", fontWeight: "600", textAlign: "center", marginBottom: 8 },
  visitorCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, marginBottom: 12, borderRadius: 12 },
  visitorAvatar: { width: 50, height: 50, borderRadius: 25 },
  visitorName: { fontWeight: "700", color: "#1d1d82", fontSize: 14 },
  visitorInterest: { color: "#555", fontSize: 12 },
  visitorDetails: { color: "#333", fontSize: 12 },
  backButton: { position: "absolute", bottom: 20, left: 16, right: 16, backgroundColor: "#FFD700", padding: 12, borderRadius: 10 },
  backText: { color: "#1d1d82", fontWeight: "700", textAlign: "center", fontSize: 16 },
});
