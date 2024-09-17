import mongoose from 'mongoose';

export async function connectToMongoDB() {
    try {
        // Ensure that the MONGO_URI environment variable is set
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI environment variable is not set.');
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        const connection = mongoose.connection;

        // Event listeners for connection status
        connection.on('connected', () => {
            console.log('Successfully connected to MongoDB.');
        });

        connection.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1); // Exit the process with failure code
        });

    } catch (error) {
        // Log and handle connection errors
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the process with failure code
    }
}
