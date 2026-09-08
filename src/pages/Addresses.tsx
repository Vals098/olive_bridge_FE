import { useEffect, useState } from "react"
import { Button, Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { getAddresses } from "../redux/actions/addressAction/getAddresses"
import { createAddress } from "../redux/actions/addressAction/createAddress"
import { deleteAddress } from "../redux/actions/addressAction/deleteAddress"
import { updateAddress } from "../redux/actions/addressAction/updateAddress"

import type { AddressRequest } from "../types/AddressRequest"
import type { Address } from "../types/Address"

import AddressCard from "../components/AddressCard"
import AddressForm from "../components/AddressForm"

function Addresses() {
  const dispatch = useDispatch<AppDispatch>()

  const addresses = useSelector(
    (state: RootState) => state.address.addresses,
  )

  const [showForm, setShowForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)

  const [formData, setFormData] = useState<AddressRequest>({
    label: "",
    recipientName: "",
    postalCode: "",
    prefecture: "",
    city: "",
    area: "",
    street: "",
    building: "",
  })

  useEffect(() => {
    dispatch(getAddresses())
  }, [dispatch])

  const emptyAddress: AddressRequest = {
    label: "",
    recipientName: "",
    postalCode: "",
    prefecture: "",
    city: "",
    area: "",
    street: "",
    building: "",
  }

  const handleSubmit = async (data: AddressRequest) => {
    if (editingAddressId) {
      await dispatch(updateAddress(editingAddressId, data))
    } else {
      await dispatch(createAddress(data))
    }

    setFormData(emptyAddress)
    setEditingAddressId(null)
    setShowForm(false)
  }

  const handleEdit = (address: Address) => {
    setEditingAddressId(address.addressId)

    setFormData({
      label: address.label,
      recipientName: address.recipientName,
      postalCode: address.postalCode,
      prefecture: address.prefecture,
      city: address.city,
      area: address.area,
      street: address.street,
      building: address.building ?? "",
    })

    setShowForm(true)
  }

  const handleAddAddress = () => {
    setEditingAddressId(null)
    setFormData(emptyAddress)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingAddressId(null)
    setFormData(emptyAddress)
    setShowForm(false)
  }

  return (
    <main className="addresses-page">
      <Container>
        <div className="addresses-header">
          <p className="addresses-label">OLIVEBRIDGE</p>
          <h1>My Addresses</h1>
          <p>
            Manage your saved shipping addresses for a faster checkout.
          </p>
        </div>

        {addresses.length === 0 && !showForm ? (
          <div className="addresses-empty">
            <div className="addresses-empty-icon">⌂</div>

            <h2>No saved addresses yet</h2>

            <p>
              Add a shipping address to make your future orders quicker and
              easier.
            </p>

            <Button
              className="addresses-primary-button"
              onClick={handleAddAddress}
            >
              Add Address
            </Button>
          </div>
        ) : (
          <>
            {addresses.length > 0 && (
              <Row className="g-4">
                {addresses.map((address) => (
                  <Col key={address.addressId} md={6}>
                    <AddressCard
                      address={address}
                      onEdit={() => handleEdit(address)}
                      onDelete={() =>
                        dispatch(deleteAddress(address.addressId))
                      }
                    />
                  </Col>
                ))}
              </Row>
            )}

            {!showForm && addresses.length > 0 && (
              <div className="addresses-add-wrapper">
                <Button
                  className="addresses-primary-button"
                  onClick={handleAddAddress}
                >
                  Add Address
                </Button>
              </div>
            )}
          </>
        )}

        {showForm && (
          <div className="address-form-card">
            <div className="address-form-header">
              <p className="addresses-label">OLIVEBRIDGE</p>

              <h2>
                {editingAddressId ? "Edit Address" : "Add New Address"}
              </h2>

              <p>
                {editingAddressId
                  ? "Update your saved shipping address."
                  : "Add a new shipping address to your account."}
              </p>
            </div>

            <AddressForm
              key={editingAddressId ?? "new"}
              initialData={formData}
              onSubmit={handleSubmit}
              submitLabel={
                editingAddressId ? "Save Changes" : "Save Address"
              }
            />

            <Button
              variant="outline-secondary"
              className="address-form-cancel"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </Container>
    </main>
  )
}

export default Addresses