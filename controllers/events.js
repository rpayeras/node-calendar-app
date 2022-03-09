const Event = require("../models/Event")

const getEvents = async(req, res) => {
    const events = await Event.find().populate('user', 'name')

    return res.status(201).json({
        ok: true,
        data: events
    })
}

const createEvent = async(req, res) => {
    const {title, startDate, endDate, notes} = req.body;

    try{
        const event = new Event(req.body)
        event.user = req.uid
        const userRes = await event.save()

        return res.status(201).json({
            ok: true,
            data: {...userRes.toJSON()}
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on save new event',
        })

        console.log(err)
    }
}

const updateEvent = async(req, res) => {
    const {title, startDate, endDate, notes} = req.body;
    const eventId = req.params.id;
    const uid = req.uid;

    try{
        let event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "event not exists"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You no have permission for edit this event"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const resEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        return res.status(201).json({
            ok: true,
            date: resEvent.toJSON()
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on save event',
        })

        console.log(err)
    }
}

const deleteEvent = async(req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try{
        let event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "event not exists"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You no have permission for edit this event"
            })
        }

        await Event.findByIdAndDelete(eventId)

        return res.status(201).json({
            ok: true
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on delete event',
        })

        console.log(err)
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}