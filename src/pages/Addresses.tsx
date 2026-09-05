import { useEffect, useState } from "react"
import type { SyntheticEvent } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { getAddresses } from "../redux/actions/addressAction/getAddresses"
import { createAddress } from "../redux/actions/addressAction/createAddress"
import type { AddressRequest } from "../types/AddressRequest"

function Addresses() {
  const dispatch = useDispatch<AppDispatch>()

  const addresses = useSelector(
    (state: RootState) => state.address.addresses
  )

  const [showForm, setShowForm] = useState(false)

  const [label, setLabel] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [city, setCity] = useState("")
  const [area, setArea] = useState("")
  const [street, setStreet] = useState("")
  const [building, setBuilding] = useState("")

  useEffect(() => {
    dispatch(getAddresses())
  }, [dispatch])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const addressData: AddressRequest = {
      label,
      recipientName,
      postalCode,
      prefecture,
      city,
      area,
      street,
      building,
    }

    await dispatch(createAddress(addressData))

    setLabel("")
    setRecipientName("")
    setPostalCode("")
    setPrefecture("")
    setCity("")
    setArea("")
    setStreet("")
    setBuilding("")

    setShowForm(false)
  }

  return (
    <Container className="py-5">
      <h1>My Addresses</h1>

      {addresses.length === 0 ? (
        <p>You don't have any saved addresses yet.</p>
      ) : (
        addresses.map((address) => (
          <div key={address.addressId}>
            <h3>{address.label}</h3>

            <p>{address.recipientName}</p>

            <p>
              {address.postalCode} {address.city}
            </p>

            <p>
              {address.prefecture}, {address.area}
            </p>

            <p>{address.street}</p>

            {address.building && <p>{address.building}</p>}
          </div>
        ))
      )}

      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Address"}
      </Button>

      {showForm && (
        <Form onSubmit={handleSubmit} className="mt-4">

          <Form.Group className="mb-3">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recipient name</Form.Label>
            <Form.Control
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prefecture</Form.Label>
            <Form.Control
              type="text"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Area</Form.Label>
            <Form.Control
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Building</Form.Label>
            <Form.Control
              type="text"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">
            Save Address
          </Button>

        </Form>
      )}
    </Container>
  )
}

export default Addresses