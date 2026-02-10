package models

// WeatherCondition represents the weather condition for a race
type WeatherCondition string

const (
	WeatherDry WeatherCondition = "dry"
	WeatherWet WeatherCondition = "wet"
)

// IsValid checks if the weather condition is valid
func (w WeatherCondition) IsValid() bool {
	return w == WeatherDry || w == WeatherWet
}

// String returns the string representation
func (w WeatherCondition) String() string {
	return string(w)
}

