import { api } from "@/libs/axios";
import { AxiosError } from "axios";

interface RequestTestsProps {
  changeText: (text: string) => void;
}

export function RequestTests({ changeText }: RequestTestsProps) {
  async function handlePublicCall() {
    let text;
    try {
      const { data } = await api.get("/test/public");
      text = data;
    } catch (e: any) {
      const err = e as AxiosError;
      text = "error " + err.response?.status;
    } finally {
      changeText(text);
    }
  }

  async function handleProtectedCall() {
    let text;
    try {
      const { data } = await api.get("/test/protected");
      text = data;
    } catch (e: any) {
      const err = e as AxiosError;
      text = "error " + err.response?.status;
    } finally {
      changeText(text);
    }
  }

  async function handlePrivateCall() {
    let text;
    try {
      const { data } = await api.get("/test/private");
      text = data;
    } catch (e: any) {
      const err = e as AxiosError;
      text = "error " + err.response?.status;
    } finally {
      changeText(text);
    }
  }

  return (
    <div className="flex flex-col border rounded-md py-3 px-4 gap-4">
      <div className="flex flex-row justify-between items-center">
        <h2>REQUEST TESTS:</h2>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={handlePublicCall}
          className="bg-blue-300 hover:bg-blue-400 rounded-md py-2 px-4 self-center"
        >
          PUBLIC
        </button>
        <button
          onClick={handleProtectedCall}
          className="bg-orange-300 hover:bg-orange-400 rounded-md py-2 px-4 self-center"
        >
          PROTECTED
        </button>
        <button
          onClick={handlePrivateCall}
          className="bg-red-300 hover:bg-red-400 rounded-md py-2 px-4 self-center"
        >
          PRIVATE
        </button>
      </div>
    </div>
  );
}
