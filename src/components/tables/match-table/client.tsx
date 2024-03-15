"use client";
// #NEXT
import { useRouter } from "next/navigation";
// #ICON
import { Plus } from "lucide-react";
// #MODELS
import { MatchDatum } from "@/models/Match";
// #UTILS
import { dateFormatItalian, timeFormatHoursMinutes } from "@/utils/utils";
// #UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { MatchForm } from "@/components/forms/match-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface MatchClientProps {
  data: MatchDatum[];
  categories: string[];
}

export const MatchClient: React.FC<MatchClientProps> = ({
  data,
  categories,
}) => {
  const [filterSquad, setFilterSquad] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleFilterChangeSquad = (event: any) => {
    const value = event.target.value;
    setFilterSquad(value);
  };

  const handleFilterChangeCategory = (event: any) => {
    if (event === "all") {
      event = "";
    }

    setFilterCategory(event);
  };

  // Filtra i dati in base al campo "name" e "category"
  const filterData = data.filter(
    (item) =>
      (item.squad_home.name.toLowerCase().includes(filterSquad.toLowerCase()) ||
        item.squad_away.name
          .toLowerCase()
          .includes(filterSquad.toLowerCase())) &&
      item.squad_home.category
        .toLowerCase()
        .includes(filterCategory.toLowerCase())
  );

  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Match (${data.length})`}
          description="elenco delle partite del torneo"
        />
      </div>
      <Separator />
      <div className="grid grid-cols-2 w-full items-center gap-1.5">
        <div>
          <Label>Nome squadra</Label>
          <Input
            type="text"
            placeholder="Nome della squadra"
            value={filterSquad}
            onChange={handleFilterChangeSquad}
          />
        </div>
        <div>
          <Label>Categoria</Label>
          <Select onValueChange={handleFilterChangeCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona la categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tutte</SelectItem>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="h-[60vh]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {
            //TODO: inserire loghi delle squadre dentro la card
            data &&
              filterData.map((singleMatch) => {
                return (
                  <Dialog key={singleMatch.id}>
                    <DialogTrigger asChild>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            📆&nbsp;{dateFormatItalian(singleMatch.day)}
                            &nbsp;|&nbsp;
                            {timeFormatHoursMinutes(singleMatch.hour)}
                            <p className="text-xs text-muted-foreground pt-1">
                              Categoria:&nbsp;
                              <span className="font-bold">
                                {singleMatch.squad_home.category}
                              </span>
                              &nbsp;-&nbsp;Girone:&nbsp;
                              <span className="font-bold">
                                {singleMatch.squad_home.group}
                              </span>
                            </p>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {singleMatch.squad_home.name}&nbsp;
                            {singleMatch.score_home}
                          </div>
                          <div className="text-2xl font-bold">
                            {singleMatch.squad_away.name}&nbsp;
                            {singleMatch.score_away}
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent
                      className="lg:max-w-[500px] w-[80%] rounded"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                      onInteractOutside={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle>Modifica risultato</DialogTitle>
                        <DialogDescription>
                          In questo pannello puoi modificare il risultato della
                          partita selezionata
                        </DialogDescription>
                      </DialogHeader>
                      <MatchForm
                        initialData={singleMatch}
                        key={singleMatch.id}
                      />
                      {/* // posso modificare il data, orario e campo solamente se la partita non è stata ancora giocata */}
                      {!singleMatch.score_home || !singleMatch.score_away ? (
                        <DialogFooter>
                          <Button asChild>
                            <Link href={`/admin/match/${singleMatch.id}`}>
                              Modifica match
                            </Link>
                          </Button>
                        </DialogFooter>
                      ) : null}
                    </DialogContent>
                  </Dialog>
                );
              })
          }
        </div>
      </ScrollArea>
    </>
  );
};
