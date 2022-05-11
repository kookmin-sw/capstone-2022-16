import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useUser() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "POST",
      url: `login?loginId=${d.id}&password=${d.password}`,
    }).then((res) => {
      if (res.data !== "ok") return navigate("/");
    });
  });
  return user;
}
