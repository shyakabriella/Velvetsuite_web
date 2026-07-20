import React from "react"
import { Link } from "../Link"
import "./VelvetPropertyDetails.css"

const VelvetPropertyDetails = () => {
  return (
    <div className="vs-property-details">
      <div className="vs-property-details-inner">
        <div className="vs-property-details-header">
          <h2 className="vs-property-details-header-title">Property Details</h2>
        </div>
        <div className="vs-property-details-content">
          <div className="vs-property-details-content-left">
            <div className="vs-property-details-content-left-header">
              <h3 className="vs-property-details-content-left-header-title">Overview</h3>
            </div>

            <div className="vs-property-details-content-left-description">
              <p>
                Experience the ultimate luxury at Velvet Suites. Our beautifully appointed property
                offers breathtaking views, premium amenities, and a perfectly central location
                for your stay in Kigali. Whether you are traveling for business or leisure,
                our dedicated staff is here to ensure an unforgettable experience.
              </p>
            </div>

            <div className="vs-property-details-content-left-body">
              <div className="vs-property-details-content-left-body-row">
                <div className="vs-property-details-content-left-body-row-label">
                  <p>Property Type</p>
                </div>
                <div className="vs-property-details-content-left-body-row-value">
                  <p>Hotel</p>
                </div>
              </div>
              <div className="vs-property-details-content-left-body-row">
                <div className="vs-property-details-content-left-body-row-label">
                  <p>Location</p>
                </div>
                <div className="vs-property-details-content-left-body-row-value">
                  <p>Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="vs-property-details-action" style={{ marginTop: '2.5rem' }}>
              <Link to="/gallery" className="vs-btn-primary">View More</Link>
            </div>
          </div>

          <div className="vs-property-details-content-right">
            <img
              src="/images/hotel_exterior.png"
              alt="Velvet Suites Property"
              className="vs-property-details-image"
            />
          </div>
        </div>

        <div className="vs-property-details-header vs-mt-6">
          <h2 className="vs-property-details-header-title">Dining Menu</h2>
        </div>
        <div className="vs-property-details-content vs-property-details-content-reversed">
          <div className="vs-property-details-content-left">
            <div className="vs-property-details-content-left-header">
              <h3 className="vs-property-details-content-left-header-title">Signature Dishes</h3>
            </div>

            <div className="vs-property-details-content-left-description">
              <p>
                Indulge in a culinary journey at Velvet Suites. Our master chefs blend local flavors
                with international techniques to create exquisite, mouth-watering dishes. Enjoy our
                curated selection of fine wines and handcrafted cocktails in an elegant dining setting.
              </p>
            </div>

            <div className="vs-property-details-content-left-body">
              <div className="vs-property-details-content-left-body-row">
                <div className="vs-property-details-content-left-body-row-label">
                  <p>Cuisine</p>
                </div>
                <div className="vs-property-details-content-left-body-row-value">
                  <p>African & Continental Fusion</p>
                </div>
              </div>
              <div className="vs-property-details-content-left-body-row">
                <div className="vs-property-details-content-left-body-row-label">
                  <p>Opening Hours</p>
                </div>
                <div className="vs-property-details-content-left-body-row-value">
                  <p>06:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            <div className="vs-property-details-action" style={{ marginTop: '2.5rem' }}>
              <Link to="/menu" className="vs-btn-primary">View Full Menu</Link>
            </div>
          </div>

          <div className="vs-property-details-content-right">
            <img
              src="/images/dining_menu.png"
              alt="Velvet Suites Dining"
              className="vs-property-details-image"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default VelvetPropertyDetails