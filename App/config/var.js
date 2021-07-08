export let defBranch = '1';

export const setBranch = async (branch) => {
  defBranch = branch;
};

export const sendNotification = async (title, message, token) => {
  const requestOptions = {
    method: 'GET',
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title,
      message,
      token,
    }),
  };
  try {
    fetch(
      `http://192.168.43.148/send-notifications/sendToToken.php?token=${token}&title=${title}&message=${message}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
};
