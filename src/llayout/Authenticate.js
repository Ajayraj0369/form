export default async function Authenticate({ username, password }) {
  console.log("hapy");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "harry" && password === "123") {
        resolve({ name: "raj" });
      } else {
        reject(new Error("there was an error"));
      }
    }, 1000);
  });
}
