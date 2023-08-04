// "use client";
// Styles & Images
import styles from "../page.module.css";

// Database
import { prisma } from "../lib/prisma";

const UserReviews = async ({ userEmail }) => {
  const userReviews = await prisma.review.findMany({
    where: {
      author: {
        email: {
          equals: userEmail,
        },
      },
    },
  });

  if (userReviews) {
    return (
      <div>
        <p>test</p>
        <p>{userEmail}</p>
        {userReviews &&
          userReviews.map((rev) => {
            return (
              <div key={rev.id}>
                <p>DoctorId: {rev.doctorId}</p>
                <p>Rating: {rev.rating}</p>
                <p>Title: {rev.title}</p>
                <p>Body: {rev.body}</p>
              </div>
            );
          })}
      </div>
    );
  }
};

export default UserReviews;
