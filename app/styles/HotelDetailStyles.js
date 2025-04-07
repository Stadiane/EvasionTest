import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  mapButton: {
    backgroundColor: "#498279",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageScroll: {
    marginVertical: 15,
  },
  detailImage: {
    width: 280,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
  },
  reserveButton: {
    backgroundColor: "#498279",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  reserveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default styles;
