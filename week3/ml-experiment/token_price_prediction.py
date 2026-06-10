# token_price_prediction.py

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# -----------------------------
# Step 1: Generate Dataset
# -----------------------------

np.random.seed(42)

days = np.arange(1, 366)

trend = days * 0.0001
noise = np.random.normal(0, 0.005, len(days))

prices = 0.01 + trend + noise
prices = np.abs(prices)

volume = np.random.randint(1000, 50000, len(days))
transactions = np.random.randint(10, 500, len(days))

df = pd.DataFrame({
    "day": days,
    "price": prices,
    "volume": volume,
    "transactions": transactions
})

# -----------------------------
# Step 2: Feature Engineering
# -----------------------------

df["price_lag1"] = df["price"].shift(1)
df["price_lag2"] = df["price"].shift(2)
df["price_lag3"] = df["price"].shift(3)

df["price_ma7"] = df["price"].rolling(window=7).mean()
df["price_ma30"] = df["price"].rolling(window=30).mean()

df.dropna(inplace=True)

# -----------------------------
# Step 3: Train/Test Split
# -----------------------------

features = [
    "day",
    "volume",
    "transactions",
    "price_lag1",
    "price_lag2",
    "price_lag3",
    "price_ma7",
    "price_ma30"
]

X = df[features]
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -----------------------------
# Step 4: Train Model
# -----------------------------

model = LinearRegression()
model.fit(X_train, y_train)

# -----------------------------
# Step 5: Evaluation
# -----------------------------

y_pred = model.predict(X_test)

r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print("=" * 40)
print("MODEL EVALUATION")
print("=" * 40)
print(f"R² Score : {r2:.4f}")
print(f"RMSE     : {rmse:.6f}")

# -----------------------------
# Step 6: Future Prediction
# -----------------------------

future_prices = []

temp_df = df.copy()

for i in range(1, 6):

    last_row = temp_df.iloc[-1]

    future_day = int(last_row["day"] + 1)

    future_volume = np.random.randint(1000, 50000)
    future_transactions = np.random.randint(10, 500)

    input_data = pd.DataFrame({
        "day": [future_day],
        "volume": [future_volume],
        "transactions": [future_transactions],
        "price_lag1": [last_row["price"]],
        "price_lag2": [last_row["price_lag1"]],
        "price_lag3": [last_row["price_lag2"]],
        "price_ma7": [temp_df["price"].tail(7).mean()],
        "price_ma30": [temp_df["price"].tail(30).mean()]
    })

    predicted_price = model.predict(input_data)[0]

    future_prices.append(predicted_price)

    new_row = {
        "day": future_day,
        "price": predicted_price,
        "volume": future_volume,
        "transactions": future_transactions,
        "price_lag1": last_row["price"],
        "price_lag2": last_row["price_lag1"],
        "price_lag3": last_row["price_lag2"],
        "price_ma7": temp_df["price"].tail(7).mean(),
        "price_ma30": temp_df["price"].tail(30).mean()
    }

    temp_df = pd.concat(
        [temp_df, pd.DataFrame([new_row])],
        ignore_index=True
    )

print("\nNext 5 Day Predictions")
for i, price in enumerate(future_prices, start=1):
    print(f"Day +{i}: ${price:.4f}")

# -----------------------------
# Step 7: Visualization
# -----------------------------

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Graph 1
axes[0, 0].plot(df["day"], df["price"])
axes[0, 0].set_title("Historical Token Prices")
axes[0, 0].set_xlabel("Day")
axes[0, 0].set_ylabel("Price")

# Graph 2
axes[0, 1].scatter(y_test, y_pred)
axes[0, 1].set_title("Actual vs Predicted")
axes[0, 1].set_xlabel("Actual Price")
axes[0, 1].set_ylabel("Predicted Price")

# Graph 3
future_days = [366, 367, 368, 369, 370]

axes[1, 0].bar(
    [str(day) for day in future_days],
    future_prices
)
axes[1, 0].set_title("Future Price Predictions")
axes[1, 0].set_xlabel("Day")
axes[1, 0].set_ylabel("Predicted Price")

# Graph 4
axes[1, 1].plot(df["day"], df["volume"])
axes[1, 1].set_title("Trading Volume")
axes[1, 1].set_xlabel("Day")
axes[1, 1].set_ylabel("Volume")

plt.tight_layout()

plt.savefig(
    "token_price_prediction.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()

print("\nGraph saved as: token_price_prediction.png")
