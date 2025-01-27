import { Button } from "./ui/button"
import { useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";


const CitySearch = () => {

    const[open, setOpen] = useState(false);
    const[query, setQuery] = useState("");
    const {data:locations , isLoading} = useLocationSearch(query);
    const navigate = useNavigate();
    const {history, clearHistory, addToHistory} = useSearchHistory();

    const handleSelect = (cityData:string) => {
        const [lat, lon, name, country] = cityData.split("|");
        // add to search history
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });
        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    
  return (
    <>

        <Button 
            variant="outline"
            className="relative justify-start w-full text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setOpen(true)}
        >
            <Search className="w-4 h-4 mr-2" />
            Search cities...
        </Button>
      
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery}/>
            <CommandList>
                {query.length > 2 && !isLoading && (<CommandEmpty>No cities found.</CommandEmpty>)}

                <CommandGroup heading="Favorites">
                {/* <CommandItem>Calendar</CommandItem> */}
                </CommandGroup>

                {history.length > 0 && (
                    <>
                        <CommandSeparator/>
                        <CommandGroup>
                            <div className="flex items-center justify-between px-2 my-2">
                                <p className="text-xs text-muted-foreground">Recent Searches</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={()=> clearHistory.mutate()}
                                >
                                    <XCircle className="w-4 h-4"/>
                                    Clear
                                </Button>
                            </div>
                            {history.map((location)=>{
                               return(
                                    <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Clock className="w-4 h-4 mr-2 text-muted-foreground"/>
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">, {location.state}</span>
                                        )}
                                        <span className="text-sm text-muted-foreground">, {location.country}</span>
                                        <span className="ml-auto text-xs text-muted-foreground">{format(location.searchedAt, "MMM d, h:mm a")}</span>
                                    </CommandItem>
                               );
                            })}
                        </CommandGroup>
                    </>
                )}

                <CommandSeparator/>

                {locations && locations.length > 0 && (
                    <CommandGroup heading="Suggestions">
                        {isLoading && (
                            <div className="flex justify-center p-4 item-center">
                                <Loader2 className="w-4 h-4 animate-spin"/>
                            </div>
                        )}
                    {locations.map((location)=>{
                        return(
                            <CommandItem
                                key={`${location.lat}-${location.lon}`}
                                value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                onSelect={handleSelect}
                            >
                                <Search className="w-4 h-4 mr-2"/>
                                <span>{location.name}</span>
                                {location.state && (
                                    <span className="text-sm text-muted-foreground">, {location.state}</span>
                                )}
                                <span className="text-sm text-muted-foreground">, {location.country}</span>
                            </CommandItem>
                        );
                    })}
                    </CommandGroup>
                )}
                
            </CommandList>
        </CommandDialog>

    </>
  )
}

export default CitySearch
