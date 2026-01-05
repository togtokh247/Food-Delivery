import { connect } from 'mongoose';

export const connectToDatabase = async () => {
    await connect(`mongodb+srv://admin:WUEottfOvhy9iomX@cluster0.pltt0uk.mongodb.net/?appName=Cluster0`)
}