import Header from "../components/ui/Header";

export default function FinishPage() {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen gap-1">
      <Header title="The End" />
      <main className="flex flex-col items-center gap-4 w-full py-10">
        <div className="min-h-100 w-1/2 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-2 items-center w-full">
            <h1>Thank you!</h1>
            <p>
              The experiment is over. If you have any questions, requests or critics to make about
              the experiment, don't hesitate to contact us:
            </p>
            <h1>Contacts</h1>
            <ul className="list-disc">
              <li>
                <a href="mailto:nathan.hugon-hostens@grenoble-inp.org">
                  nathan.hugon-hostens@grenoble-inp.org
                </a>
              </li>
              <li>
                <a href="mailto:mathias.devilliers@grenoble-inp.org">
                  mathias.devilliers@grenoble-inp.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
