import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 18,
    color: "#498279",
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  datePicker: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 2,
  },
  disabled: {
    backgroundColor: "#e0e0e0",
  },

  pickerContainer: {
    marginVertical: 20,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "space-between",
    elevation: 2,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 15,
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  counterContainer: {
    alignItems: "center",
    flex: 1,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  counterButton: {
    backgroundColor: "#498279",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  counterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  montant: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginVertical: 15,
  },

  confirmButton: {
    backgroundColor: "#498279",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    elevation: 3,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmButtonDisabled: {
    backgroundColor: "#ccc",
  },

  capacityWarningText: {
    color: "#c0392b",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  commentButton: {
    backgroundColor: "#3b6978",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  commentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentSuccess: {
    color: "#27ae60",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },
});

export default styles;
