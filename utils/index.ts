import prisma from '../prisma/index';


const connectToDB = async () => {
  try {
    await prisma.$connect();
  } catch (error: any) {
    console.log(error.message);
  }
};
export default connectToDB;