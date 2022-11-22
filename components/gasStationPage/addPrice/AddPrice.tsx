import { View } from "react-native"
import { Button, Headline, TextInput, Snackbar } from "react-native-paper"
import { styles } from "./addPrice.style"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_GAS_PRICE } from "../../../graphql/mutations.graphql"

//Define the types of the props
type Props = {
  id: string
  refetch: (variables: { id: string }) => void
}

export default function AddPrice({ id, refetch }: Props) {
  //The price that is set in the input field
  const [price, setPrice] = useState<number | null>(null)
  // If snackbar should be visible. Only if price is updated
  const [snackbarVisible, setSnackbarVisible] = useState(false)

  //The mutation that add a new price to the given gas station
  const [createGasPrice, { data, loading, error }] =
    useMutation(CREATE_GAS_PRICE)

  // contains the last updated price or null if no price is updated
  const [successMessage, setSuccessMessage] = useState<{
    price: number | null
    show: boolean
  }>({ price: null, show: false })

  /**The function that is called when the user clicks the submit button
   *It uses the mutation to add a new price
   */
  const addGasPrice = async () => {
    await createGasPrice({
      variables: {
        gasStation: id,
        price: price,
      },
    })
    //log the error
    if (error) {
      console.log(error)
    }
    //Loading
    if (loading) {
      return <Headline>Loading...</Headline>
    }
    //Refetch the data
    refetch({ id: id })
    //clear the price state
    setPrice(null)
    setSuccessMessage({ price: price, show: true })
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      setSuccessMessage((prev) => ({ ...prev, show: false }))
    })
    setSnackbarVisible(true)
  }

  const handleTextChange = (text: string) => {
    setPrice(parseFloat(text.replace(/^((?!(\d*\.?\d*)).)*$/g, "")))
  }

  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible)

  const onDismissSnackBar = () => setSnackbarVisible(false)

  return (
    <View style={styles.wrapper}>
      <Headline>Legg til ny pris</Headline>
      <TextInput
        keyboardType="numeric"
        label="Pris"
        placeholder="pris (kr/L)"
        style={styles.input}
        value={price ? price.toString() : ""}
        onChangeText={handleTextChange}
      />
      <Button mode="contained" style={styles.btn} onPress={addGasPrice}>
        Legg til ny pris
      </Button>
      {successMessage.price && (
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          duration={5000}
          style={styles.snackbarWrapper}
        >
          Pris er oppdatert!
        </Snackbar>
      )}
    </View>
  )
}
