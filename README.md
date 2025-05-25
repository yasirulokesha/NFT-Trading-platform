# 🪙 NFT Trading Platform

A decentralized online trading platform for NFTs, combining blockchain technology with modern web development tools. Built with **React**, **FastAPI**, **MySQL**, and **Solidity**, this project provides a secure and user-friendly platform for trading digital assets.

---

## 📦 Project Overview

This project simulates a decentralized NFT trading system that allows users to:
- Register and log in securely
- Upload and browse digital assets (NFTs)
- Purchase NFTs using wallet balances
- View transaction history and profile details

Although a Solidity smart contract was written, it was not fully integrated in the current release due to time constraints.

---

## 🧩 Tech Stack

| Layer       | Technology                  |
|------------|-----------------------------|
| Frontend    | React, HTML, CSS            |
| Backend     | FastAPI (Python)            |
| Database    | MySQL                       |
| Blockchain  | Solidity (Smart Contracts)  |
| Image Hosting | Google Firebase Storage   |
| API Communication | Axios                |

---

## ⚙️ Features

- 🖼️ **NFT Listing**: Upload and display digital assets with name, category, image, and price.
- 🔐 **User Authentication**: Login and register via a secure API using JWT tokens.
- 🔍 **Search and Filter**: Assets can be searched by name and filtered by category.
- 💰 **Purchasing**: Buy NFTs and view purchase history.
- 🔗 **Private Blockchain**: Smart contract logic is written (pending full integration).

---

## 🗂️ Database Schema

**Database**: `openTrade`

- `DigitalAssets`: assetID, AssetName, Asset(URL), Owner, Price, Category  
- `userProfiles`: email, username, password, walletNumber, walletBalance  
- `Transactions`: transactionID, assetID, price, from, to  

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/login` | POST | User login |
| `/profile` | POST | Get profile by username |
| `/` | GET | Get all assets |
| `/category` | GET | Filter assets by category |
| `/details` | GET | Detailed list of assets with owner info |
| `/search` | GET | Search assets by keyword |
| `/add_account` | POST | Register new account |
| `/upload` | POST | Upload new NFT |
| `/profile/feed/{username}` | GET | User’s uploaded assets |
| `/activity` | POST | Get user's transaction history |
| `/purchase` | POST | Purchase an NFT |

---

## 🖼️ Frontend Preview

- **Home Page**: List NFTs and apply filters
- **User Dashboard**: View profile, upload assets, wallet summary
- **Login/Register Pages**: Secure access and account creation

---

## 🚀 Deployment Instructions

### ⚙️ Dependencies

- Node.js
- Python (FastAPI)
- MySQL Server
- Anaconda (Optional for environment setup)

### 🧪 Backend Setup

1. Import `openTrade.sql` to MySQL.
2. Update DB credentials in `src/API/database.py`.
3. Create environment from `OpenTradeEnv.yaml` using Anaconda.
4. Run backend:
   ```bash
   uvicorn main:app --reload
   ```

### 🧑‍💻 Frontend Setup

1. Navigate to project root:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

---

## 📁 Directory Structure

```
NFT-Trading-platform/
├── src/
│   ├── API/                  # FastAPI backend
│   ├── frontend/             # React frontend
│   ├── smart_contract/       # Solidity contract files
│   ├── database/             # DB connection config
│   └── OpenTradeEnv.yaml     # Conda environment file
├── openTrade.sql             # MySQL schema
├── README.md                 # You're here!
```

---

## 📝 Conclusion

This NFT trading platform showcases the practical integration of blockchain, databases, and full-stack web development to create a decentralized, secure, and intuitive system. Although smart contract integration is pending, the foundational infrastructure is fully functional and scalable.

---

## 🔗 References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Web3.py](https://web3py.readthedocs.io/)
- [Anaconda Guide](https://www.python-engineer.com/posts/anaconda-basics/)
